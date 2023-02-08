![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=올해까치&fontSize=60&animation=fadeIn&fontAlignY=38&descAlignY=51&descAlign=50)

## 서비스 소개

올해까치는 시즌 서비스로 **목표 작성 및 리마인드 서비스**입니다.
5가지의 복(福) 테마 중 하나를 선택할 수 있습니다.  
선택한 복의 종류에 따라 다른 엽서에 목표를 적을 수 있으며,
작성한 내용은 **6개월 뒤에 메일**로 다시 받아 볼 수 있습니다.

<br>

## 프로젝트 개발 기간

2022.12.09 ~ 2022.12.29

<br>

## 서비스 운영 기간

2022.12.29 ~ 2023.01.31

<br>

## 배포 주소

#### [🖥️ 올해까치 Demo](https://thisyearkkachi-demo.netlify.app/)

<br>

## 레파지토리 주소

#### [📍 FRONTEND](https://github.com/hrimwk/until-this-year)<br>
#### [📍 BACKEND](https://github.com/JJieunn/until-this-year)

<br>

## 팀원 및 협업 방식
<b>팀원</b>

[📕 이혜림 FE](https://github.com/hrimwk) <br>
[📙 봉원희 FE](https://github.com/2021bong) <br>
[📗 박지은 BE](https://github.com/JJieunn) <br>
[📘 유효진 Design](mailto:dbgywls11111@gmail.com)

<b>협업 방식</b>

[🗂️ 팀 노션](https://www.notion.so/308bcbf7e4c740c6ac224f99e6c81989)

<br>

## Project Flow

<img width="1144" alt="flow" src="https://user-images.githubusercontent.com/104122566/216870125-087598f0-eb7f-4840-bef5-fd84521d4710.png">

<br>

## 사용 기술 및 라이브러리

- Typescript, Node.js, Express, MySQL, TypeORM, pm2, CryptoJS
- AWS EC2, RDS, Route53, ACM, ALB

<br>

## 데이터베이스 모델링


<img width="740" alt="image" src="https://user-images.githubusercontent.com/108418225/217545474-eab347ee-dcd2-440e-8082-c67fe4eeb322.png">

<br>

## 프로젝트 구조

```
📦 until-this-year
 ┣ 📂 docs
  ┗ 📜 Kkachi_API_Docs
 ┣ 📂 src
    ┣ 📂 configs
    ┣ 📂 controllers
    ┣ 📂 dto
    ┣ 📂 entities
    ┣ 📂 middleware
    ┣ 📂 models
    ┣ 📂 routes
    ┣ 📂 services
    ┣ 📜 app.ts
    ┗ 📜 server.ts
 ┣ 📜 pm2_ecosystem.config.json
 ┣ 📜 package.json
 ┗ 📜 tsconfig.json
```

<br>


## 서비스 특징 및 주요 기능
### 0) 서비스 특징
- 6개월 후 새해 목표를 메일로 리마인드 시켜준다는 기획에 따라 이용자를 특정할 수 있는 개인 정보로 이메일을 수집합니다.
- 작은 규모, 단기간으로 서비스를 개발하기에 보안에 취약할 수 있다는 점을 고려하여 개인 정보를 최소화했습니다.
- 서비스 이용 시, 암호를 입력하지 않으므로 만약 기존의 목표를 조회해온다면 상대의 이메일만 알아도 그대로 노출될 수 있기 때문에 덮어쓰기하도록 구현했습니다.

<br>

### 1) 이용자 이메일 체크 (checkEmail)
- 기존 이용자의 경우, 덮어쓰기 여부를 모달 창으로 안내하기 때문에 이메일을 체크합니다.
- CryptoJS에서 제공되는 기능 중 양방향 암호화인 AES 방식을 선택했습니다.
- Users Entity에 저장된 이메일 목록을 조회하여 CryptoJS로 암호화된 이메일을 복호화합니다.
- 복호화된 이메일과 현재 전달된 이메일이 동일한지 map 반복문을 통하여 대조합니다.
- 동일할 경우, "Email_Exists" 메시지로 예외 처리합니다.
- 일치하는 이메일이 없는 경우, "Available" 메시지로 응답합니다.
- 필수 값인 이메일이 request로 전달되지 않은 경우 "Input_Error" 예외 처리합니다.

<br>

### 2) 이용자 등록 (createUserInfo)
- 이용자의 정보(닉네임, 이메일, 운, 수신 동의, 목표)를 등록합니다.
- 닉네임, 이메일은 정규표현식을 통해 검증합니다.
- 5가지 운(복) 중에 선택한 값을 string으로 전달받아, 해당하는 idx number값으로 전환해주는 함수(getFortuneIdByName)를 사용합니다.
- 필수 값인 닉네임, 이메일, 운, 목표가 전달되지 않을 경우 "Input_Error" 예외 처리합니다.
- 수신 동의(opt_in)를 체크하지 않을 때 디폴트 값으로 F (현재 Tinyint로 정의된 column으로 0) 이 저장됩니다.
- 이용자 이메일 체크 후, 기존 이용자의 경우 분기하여 다른 함수를 실행합니다.
- 기존 이용자는 Users Entity는 update를, Goals Entity에 이미 있던 목표는 전부 delete한 후 새롭게 insert 합니다.
- 여러 개의 목표를 한번에 insert할 수 있도록 forEach 반복문으로 values 쿼리문을 작성합니다.
- 이때 쓰이는 user_id 값은 insert 쿼리문 실행 결과에 담긴 insertId 이나 앞서 실행한 checkEmail 함수의 결과를 이용합니다.
- 여러 이용자가 등록하는 중에도 원자성, 독립성이 유지될 수 있도록 Transaction을 통해 이용자 정보를 등록합니다. 

<br>

## 프로젝트 실행 방법

#### 배포된 서비스가 아닌 직접 Clone하여 프로젝트를 실행하려면 다음 순서대로 실행합니다.  

### Git Clone

```
$ git clone https://github.com/JJieunn/until-this-year.git
$ cd until-this-year
```
### Installation

```
$ npm install
```
### Make .env
```
(미리 사용할 DB/Schema를 만들어 둡니다.)

DATABASE_URL = mysql://USERNAME:PASSWORD@127.0.0.1:3306/DATABASE
TYPEORM_CONNECTION = mysql
TYPEORM_HOST = 127.0.0.1
TYPEORM_PORT = 3306
TYPEORM_USERNAME = 계정
TYPEORM_PASSWORD = 비밀번호
TYPEORM_DATABASE = 미리 생성한 데이터베이스

KEY = CryptoJS에 쓰일 16자리의 키 값
PORT = 애플리케이션 서버 포트 번호
```

### DataBase

```
src/configs/typeorm.config.ts 에서 

synchronize: true 로 변경

(npm run start하여 table이 만들어진 후, 다시 false로 변경합니다.)
```
### Running the app

```
$ npm run dev
```




