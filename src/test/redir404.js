// Функция обработки ошибки 404
const generateNotFoundError = (resourceName) => {
    const message = `Запрашиваемый ресурс ${resourceName} не найден`;
    const error = new Error(message);
    error.statusCode = 404;
    return error;
};