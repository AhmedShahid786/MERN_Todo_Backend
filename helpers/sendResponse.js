export default function sendResponse(res, status, data, success, msg) {
  res.status(status).json({
    success,
    msg,
    data: data,
  });
}
