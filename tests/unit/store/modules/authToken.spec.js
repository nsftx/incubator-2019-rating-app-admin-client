import authToken from '@/store/modules/authToken';

test('token should be empty string', () => {
  expect(typeof authToken.state.token).toBe('string');
  expect(authToken.state.token).toEqual('');
});

test('isLogged initial value should be false', () => {
  expect(authToken.state.isLogged).toBeFalsy();
});

test('user value should be object', () => {
  expect(typeof authToken.state.loggedUser).toBe('object');
});

test('setToken updates state with token in payload', () => {
  let token = 'asklsjdfsjfkldjgfkfjsgfčgldfds';
  authToken.mutations.setToken(authToken.state, { token });
  expect(authToken.state.token.token).toEqual(token);
});

test('setLogged updates state with isLogged in payload', () => {
  let isLogged = false;
  authToken.mutations.setLogged(authToken.state, { isLogged });
  expect(authToken.state.isLogged.isLogged).toBeFalsy();
});

test('setUser updates state with user in payload', () => {
  let user = {
    name: 'pero',
    lastname: 'peric',
    password: 'peroperic',
  };
  authToken.mutations.setUser(authToken.state, { user });
  expect(authToken.state.loggedUser.user).toEqual(user);
  expect(authToken.state.loggedUser.user.name).toEqual(user.name);
  expect(authToken.state.loggedUser.user.lastname).toEqual(user.lastname);
  expect(authToken.state.loggedUser.user.password).toEqual(user.password);
});

test('returns data from state', () => {
  const getToken = authToken.getters.token(authToken.state);
  const getisLogged = authToken.getters.isLogged(authToken.state);
  const getloggedUser = authToken.getters.loggedUser(authToken.state);

  expect(getToken).toEqual(authToken.state.token);
  expect(getisLogged).toEqual(authToken.state.isLogged);
  expect(getloggedUser).toEqual(authToken.state.loggedUser);
});
