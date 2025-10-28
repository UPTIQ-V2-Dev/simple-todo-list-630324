# API SPECIFICATION

## Database Models (Prisma Schema)

```prisma
model User {
  id              Int      @id @default(autoincrement())
  email           String   @unique
  name            String?
  password        String
  role            String   @default("USER")
  isEmailVerified Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  Token           Token[]
}

model Token {
  id          Int       @id @default(autoincrement())
  token       String
  type        String
  expires     DateTime
  blacklisted Boolean
  createdAt   DateTime  @default(now())
  user        User      @relation(fields: [userId], references: [id])
  userId      Int
}
```

## Authentication Endpoints

---

EP: POST /auth/register
DESC: Register a new user account.
IN: body:{name:str!, email:str!, password:str!}
OUT: 201:{user:obj{id:int, email:str, name:str?, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}, tokens:obj{access:obj{token:str, expires:str}, refresh:obj{token:str, expires:str}}}
ERR: {"400":"Duplicate email or invalid input", "422":"Validation failed", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/register -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
EX_RES_201: {"user":{"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":false,"createdAt":"2025-10-27T10:30:00Z","updatedAt":"2025-10-27T10:30:00Z"},"tokens":{"access":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2025-10-27T11:30:00Z"},"refresh":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2025-11-03T10:30:00Z"}}}

---

EP: POST /auth/login
DESC: Authenticate user with email and password.
IN: body:{email:str!, password:str!}
OUT: 200:{user:obj{id:int, email:str, name:str?, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}, tokens:obj{access:obj{token:str, expires:str}, refresh:obj{token:str, expires:str}}}
ERR: {"401":"Invalid email or password", "422":"Validation failed", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/login -H "Content-Type: application/json" -d '{"email":"john@example.com","password":"password123"}'
EX_RES_200: {"user":{"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":false,"createdAt":"2025-10-27T10:30:00Z","updatedAt":"2025-10-27T10:30:00Z"},"tokens":{"access":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2025-10-27T11:30:00Z"},"refresh":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2025-11-03T10:30:00Z"}}}

---

EP: POST /auth/logout
DESC: Logout user by invalidating refresh token.
IN: body:{refreshToken:str!}
OUT: 204:{}
ERR: {"404":"Token not found", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/logout -H "Content-Type: application/json" -d '{"refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}'
EX_RES_204: {}

---

EP: POST /auth/refresh-tokens
DESC: Refresh access and refresh tokens using valid refresh token.
IN: body:{refreshToken:str!}
OUT: 200:{access:obj{token:str, expires:str}, refresh:obj{token:str, expires:str}}
ERR: {"401":"Invalid refresh token", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/refresh-tokens -H "Content-Type: application/json" -d '{"refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}'
EX_RES_200: {"access":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2025-10-27T11:30:00Z"},"refresh":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2025-11-03T10:30:00Z"}}

---

EP: POST /auth/forgot-password
DESC: Send password reset email to user.
IN: body:{email:str!}
OUT: 204:{}
ERR: {"404":"User not found", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/forgot-password -H "Content-Type: application/json" -d '{"email":"john@example.com"}'
EX_RES_204: {}

---

EP: POST /auth/reset-password
DESC: Reset user password using reset token.
IN: query:{token:str!}, body:{password:str!}
OUT: 204:{}
ERR: {"401":"Invalid or expired token", "422":"Validation failed", "500":"Internal server error"}
EX_REQ: curl -X POST "/auth/reset-password?token=resetToken123" -H "Content-Type: application/json" -d '{"password":"newPassword123"}'
EX_RES_204: {}

---

EP: POST /auth/send-verification-email
DESC: Send email verification email to authenticated user.
IN: headers:{Authorization:str!}
OUT: 204:{}
ERR: {"401":"Unauthorized", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/send-verification-email -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_204: {}

---

EP: POST /auth/verify-email
DESC: Verify user email using verification token.
IN: query:{token:str!}
OUT: 204:{}
ERR: {"401":"Invalid or expired token", "500":"Internal server error"}
EX_REQ: curl -X POST "/auth/verify-email?token=verifyToken123"
EX_RES_204: {}

## User Management Endpoints

---

EP: POST /users
DESC: Create a new user (admin only).
IN: headers:{Authorization:str!}, body:{name:str!, email:str!, password:str!, role:str!}
OUT: 201:{id:int, email:str, name:str?, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}
ERR: {"400":"Duplicate email or invalid input", "401":"Unauthorized", "403":"Forbidden - admin access required", "422":"Validation failed", "500":"Internal server error"}
EX_REQ: curl -X POST /users -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -H "Content-Type: application/json" -d '{"name":"Jane Smith","email":"jane@example.com","password":"password123","role":"USER"}'
EX_RES_201: {"id":2,"email":"jane@example.com","name":"Jane Smith","role":"USER","isEmailVerified":false,"createdAt":"2025-10-27T10:35:00Z","updatedAt":"2025-10-27T10:35:00Z"}

---

EP: GET /users
DESC: Get paginated list of users with optional filtering (admin only).
IN: headers:{Authorization:str!}, query:{name:str?, role:str?, sortBy:str?, limit:int?, page:int?}
OUT: 200:{results:arr[obj{id:int, email:str, name:str?, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}], page:int, limit:int, totalPages:int, totalResults:int}
ERR: {"401":"Unauthorized", "403":"Forbidden - admin access required", "500":"Internal server error"}
EX_REQ: curl -X GET "/users?page=1&limit=10&role=USER" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: {"results":[{"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":false,"createdAt":"2025-10-27T10:30:00Z","updatedAt":"2025-10-27T10:30:00Z"}],"page":1,"limit":10,"totalPages":1,"totalResults":1}

---

EP: GET /users/{userId}
DESC: Get specific user by ID (users can access own data, admins can access any).
IN: headers:{Authorization:str!}, params:{userId:int!}
OUT: 200:{id:int, email:str, name:str?, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}
ERR: {"401":"Unauthorized", "403":"Forbidden", "404":"User not found", "500":"Internal server error"}
EX_REQ: curl -X GET /users/1 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: {"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":false,"createdAt":"2025-10-27T10:30:00Z","updatedAt":"2025-10-27T10:30:00Z"}

---

EP: PATCH /users/{userId}
DESC: Update user information (users can update own data, admins can update any).
IN: headers:{Authorization:str!}, params:{userId:int!}, body:{name:str?, email:str?, password:str?}
OUT: 200:{id:int, email:str, name:str?, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}
ERR: {"400":"Duplicate email or invalid input", "401":"Unauthorized", "403":"Forbidden", "404":"User not found", "422":"Validation failed", "500":"Internal server error"}
EX_REQ: curl -X PATCH /users/1 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -H "Content-Type: application/json" -d '{"name":"John Updated"}'
EX_RES_200: {"id":1,"email":"john@example.com","name":"John Updated","role":"USER","isEmailVerified":false,"createdAt":"2025-10-27T10:30:00Z","updatedAt":"2025-10-27T10:35:00Z"}

---

EP: DELETE /users/{userId}
DESC: Delete user account (users can delete own account, admins can delete any).
IN: headers:{Authorization:str!}, params:{userId:int!}
OUT: 200:{}
ERR: {"401":"Unauthorized", "403":"Forbidden", "404":"User not found", "500":"Internal server error"}
EX_REQ: curl -X DELETE /users/1 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: {}

## MCP (Model Control Protocol) Endpoints

---

EP: POST /mcp
DESC: Handle MCP POST requests with custom authentication.
IN: headers:{Authorization:str!}, body:{*}
OUT: 200:{*}
ERR: {"401":"Unauthorized - invalid MCP authentication", "500":"Internal server error"}
EX_REQ: curl -X POST /mcp -H "Authorization: Bearer mcp-token" -H "Content-Type: application/json" -d '{}'
EX_RES_200: {}

---

EP: GET /mcp
DESC: Handle MCP GET requests with custom authentication.
IN: headers:{Authorization:str!}
OUT: 200:{*}
ERR: {"401":"Unauthorized - invalid MCP authentication", "500":"Internal server error"}
EX_REQ: curl -X GET /mcp -H "Authorization: Bearer mcp-token"
EX_RES_200: {}

---

EP: DELETE /mcp
DESC: Handle MCP DELETE requests with custom authentication.
IN: headers:{Authorization:str!}
OUT: 200:{*}
ERR: {"401":"Unauthorized - invalid MCP authentication", "500":"Internal server error"}
EX_REQ: curl -X DELETE /mcp -H "Authorization: Bearer mcp-token"
EX_RES_200: {}

## Documentation Endpoints (Development Only)

---

EP: GET /docs
DESC: Serve API documentation (development mode only).
IN: {}
OUT: 200:{html}
ERR: {"404":"Not found in production", "500":"Internal server error"}
EX_REQ: curl -X GET /docs
EX_RES_200: HTML documentation page

## Common Error Response Schema

```json
{
  "code": "number",
  "message": "string",
  "stack": "string (development only)"
}
```

## Authentication

- **Bearer Token**: Include `Authorization: Bearer <token>` header for authenticated endpoints
- **MCP Authentication**: Use custom MCP authentication for MCP endpoints
- **Token Types**: ACCESS (15 min), REFRESH (7 days), RESET_PASSWORD, VERIFY_EMAIL
- **Roles**: USER, ADMIN

## Validation Rules

- **Email**: Must be valid email format and unique
- **Password**: Minimum 8 characters, at least one number and one letter  
- **Name**: String, optional for users
- **Role**: Must be "USER" or "ADMIN"