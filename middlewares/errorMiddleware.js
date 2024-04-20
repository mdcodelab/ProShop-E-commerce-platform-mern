export const notFound = (req, res, next) => {
const error = new Error(`Not found - ${req.originalURL}`)
res.status(404);
next(error);
}

export const errorHandler = (err, req, res, next) => {
let statusCode = res.statusCode === 200 ? 500 : statusCode;
let message=err.message;
res.status(statusCode).json({message})
}

