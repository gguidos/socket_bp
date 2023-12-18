export default function makeInputObjectFactory({
  md5,
  sanitize,
  MissingParameterError,
  InvalidEmailError
}) {
  return Object.freeze({ inputObj })

  function inputObj({ params }){
    const {
      username,
      password,
      email,
      role,
      created = Date.now(),
      modified = Date.now()
    } = params;

    return Object.freeze({
      username: () => checkUsername({ username }),
      password: () => checkPassword({ password }),
      email: () => checkEmail({ email }),
      role: () => checkRole({ role }),
      usernameHash: () => hash({ param: username }),
      emailHash: () => hash({ param: email }),
      usernameEmailHash: () => hash({ param: username + email }),
      usernamePasswordHash: () => hash({ param: username + password }),
      created: () => created,
      modified: () => modified
    })
  }

  function checkRole({ role }) {
    return role in ['user', 'admin'] ? role : 'user';
  }

  function checkUsername({ username }) {
    checkRequiredParam({
      param: username,
      paramName: 'username',
    });
    username = sanitize(username);
    return username;
  }

  function checkPassword({ password }) {
    checkRequiredParam({
      param: password,
      paramName: 'password',
    });
    password = md5(password);
    return password;
  }

  function checkEmail({ email }) {
    checkRequiredParam({
      param: email,
      paramName: 'email',
    });
    email = sanitize(email);
    if (!isEmail({ email })) throw new InvalidEmailError();

    return email;
  }
  
  function hash({ param }) {
    sanitize(param);
    return md5(param);
  }

  function isEmail({ email }) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function checkRequiredParam({ param, paramName }) {
    if (!param || param === '')
      throw new MissingParameterError(paramName)
    return;
   }
}
