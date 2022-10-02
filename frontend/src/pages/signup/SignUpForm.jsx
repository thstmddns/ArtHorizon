<form method="post" onSubmit={submitHandler}>
  <FormWrapper>
    <FormTitle>회원가입</FormTitle>

    {/* Email */}
    <FormControl>
      <Label htmlFor="email">이메일</Label>
      <Input
        type="email"
        id="email"
        placeholder="이메일을 입력하세요"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <ErrorMessage>{errorEmailMessage}</ErrorMessage>
    </FormControl>

    {/* Nickname */}
    <FormControl>
      <Label htmlFor="nickname">닉네임</Label>
      <Input
        type="text"
        id="nickname"
        placeholder="닉네임을 입력하세요"
        required
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <ErrorMessage>{errorNicknameMessage}</ErrorMessage>
    </FormControl>

    {/* Password 1 */}
    <FormControl>
      <Label htmlFor="password1">비밀번호</Label>
      <Input
        type="password"
        id="password1"
        placeholder="비밀번호를 입력하세요"
        required
        value={password1}
        onChange={(e) => setPassword1(e.target.value)}
      />
      <ErrorMessage>{errorPassword1Message}</ErrorMessage>
    </FormControl>

    {/* Password 2 */}
    <FormControl>
      <Label htmlFor="password2">비밀번호 확인</Label>
      <Input
        type="password"
        id="password2"
        placeholder="비밀번호를 한번 더 입력하세요"
        required
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
      />
      <ErrorMessage>{errorPassword2Message}</ErrorMessage>
    </FormControl>

    <Button onClick={submitHandler}>회원가입하기</Button>

    <FormLinksWrapper>
      <MyLink>
        <Link to={"/login"}>로그인하기</Link>
      </MyLink>
    </FormLinksWrapper>
  </FormWrapper>
</form>;
