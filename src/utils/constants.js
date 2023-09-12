export const MAIN_API_URL =
  /* 'https://api.movie-searcher.nomoredomainsicu.ru'; */ 'http://localhost:4000';

export const MOVIES_API_URL = 'https://api.nomoreparties.co/';

export const WRONG_PASSWORD_MESSAGE = 'Вы ввели неправильный логин или пароль.';

export const SIGNUP_ERROR_MESSAGE = 'При регистрации пользователя произошла ошибка.';

export const DUPLICATE_EMAIL_ERROR_MESSAGE = 'Пользователь с таким email уже существует.';

export const VALIDATION_SERVER_ERROR_MESSAGE =
  'На сервере произошла ошибка валидации при добавлении фильма.';

export const TIME_EXPIRED_ERROR_MESSAGE =
  'Время действия куки истекло. Необходима перерегистрация.';

export const DUPLICATE_MOVIE_ERROR_MESSAGE = 'Фильм уже есть в списке пользователя.';

export const REMOVE_FROM_SAVEDLIST_ERROR_MESSAGE =
  'Ошибка удаления карточки из массива. Перезагрузите страницу.';

export const UPDATE_PROFILE_ERROR_MESSAGE = 'При обновлении профиля произошла ошибка.';

export const UPDATE_PROFILE_SUCCESS_MESSAGE = 'Данные успешно обновлены.';

export const REQUIRED_ERROR_MESSAGE = 'Поле не может быть пустым.';

export const NAME_REGEXP = /^[a-zA-Zа-яА-Я-\s]*$/;
export const NAME_VALIDATION_ERROR_MESSAGE =
  'В имени допускается использовать только буквы, тире и пробел.';

export const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
export const WRONG_EMAIL_MESSAGE = 'Введено не корректное значение E-mail.';

export const PASSWORD_REGEXP = /^(?=.*[A-Z].*)(?=.*[!@#$&*])(?=.*[0-9].*)(?=.*[a-z].*).*$/;
export const PASSWORD_HINT =
  'Пароль должен содержать лат. буквы в разных регистрах, не менее одной цифры и одного спецсивола: !@#$&*';

export const PASSWORD_VALIDATION_ERROR_MESSAGE =
  'Пароль должен содержать лат. буквы в разных регистрах, не менее одной цифры и одного спецсивола: !@#$&*';

export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_MIN_LENGTH_ERROR_MESSAGE = 'Длинна должна быть от 8 символов.';

export const NAME_MIN_LENGTH = 2;
export const NAME_MIN_LENGTH_ERROR_MESSAGE = 'Длинна должна быть от 2 символов.';

export const NAME_MAX_LENGTH = 30;
export const NAME_MAX_LENGTH_ERROR_MESSAGE = 'Длинна должна до 30 символов.';

export const NO_DATA_ERROR_MESSAGE = 'Ничего не найдено.';

export const SHORT_MOVIE_DURATION = 40;

export const ADD_CARD_COUNT_FOR_1280 = 4;
export const ADD_CARD_COUNT_FOR_768 = 2;
export const ADD_CARD_COUNT_FOR_320 = 2;

export const INITIAL_CARD_COUNT_FOR_1280 = 16;
export const INITIAL_CARD_COUNT_FOR_768 = 8;
export const INITIAL_CARD_COUNT_FOR_320 = 5;
