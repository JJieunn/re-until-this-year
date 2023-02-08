## 올해까치 API Documentation

### 1. 이메일 중복 체크 API

<details>
<summary></summary>
<div>


| Method   | URL      |
| -------- | -------- |
| **POST** | /users/check |

|                 | Key        | Type   | Example           | Default | Description |
| ------------------ | ----------- | ------ | ----------------- | ------- | ----------- |
| **Body**           | email       | String | test@test.com    |         | 이메일        |


| Code | Status                   | Message                                            |
| ------ | ----------------------- | -------------------------------------------------- |
| 200    | OK                      |                      Available                     |
| 400    | Bad Request             |                      Input_Error                   |
| 409    | Conflict                |                     Email_Exists                   |
| 500    | INTERNAL_SERVER_ERROR   |            Internal Server Error                   |

**Request**

```
[POST] http://localhost:8080/users/check

{
    "email": "test@test.com"
}
```

**Response**

```
200 OK

{
    "message": "Available"
}
```
```
400 Bad Request

{
    "err": "Input_Error"
}
```
```
409 Conflict

{
    "err": "Email_Exists"
}
```
```
500 Internal Server Error

{
    "message": "Internal Server Error"
}
```
</div>
</details>

<br>
<br>

### 2. 유저 정보 등록 API

<details>
<summary></summary
<div>


| Method   | URL      |
| -------- | -------- |
| **POST** | /users/registration |

|             | Key            | Type    | Example               | Default | Description |
| ------------------ | --------------- | ------ | --------------------- | ------- | ----------- |
| **Body**           | nickname        | String | test                  |         | 닉네임       |
|                    | email           | String | test@test.com         |         | 이메일       |
|                    | fortune_id      | String | love                  |         | 운          |
|                    | opt_in          | String | T                     | F       | 수신 동의     |
|                    | goals           | Str-Array | ["goal1", "goal2"] |         | 목표들       |


| Code | Status                 | Message                          |
| ------ | --------------------- | -------------------------------- |
| 201    | Created               |        User_Created              |
| 500    |  Internal server error  |    Internal server error       |

**Request**

```
[POST] http://localhost:8080/users/registration

{
    "nickname": "test",
    "email": "test@test.com",
    "fortune_id": "love",
    "opt_in": "T",
    "goals": ["goal1", "goal2", "goal3"]
}
```

**Response**

```
201 OK

{
    "message": "User_Created"
}
```
```
500 Internal Server Error

{
    "message": "Internal Server Error"
}
```
</div>
</details>
