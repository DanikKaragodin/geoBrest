import {body} from 'express-validator';
export const loginValidator = [
    body('email',"Неверный формат почты").isEmail(),
    body('password',"Пароль должен содержать мин 5 символов").isLength({min: 5}),
];
export const registerValidator = [
    body('email',"Неверный формат почты").isEmail(),
    body('password',"Пароль должен содержать мин 5 символов").isLength({min: 5}),
    body('FullName',"Укажите Имя(мин 3 буквы)").isLength({min: 3}),
    body('avatarUrl',"Неверная ссылка на аватарку").optional().isURL(),
    body('busId','Введите номер маршрутного такси').isLength({min: 1}),
];