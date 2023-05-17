const usersModel = require("../users/users-model");

function logger(req, res, next) {
  // SİHRİNİZİ GÖRELİM

  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`[${timestamp}] - ${method} - ${url}`);

  next();
}

async function validateUserId(req, res, next) {
  // SİHRİNİZİ GÖRELİM

  const user = await usersModel.getById(req.params.id);
  if (!user) {
    next({ status: 404, message: "kullanıcı bulunamadı" });
    return;
  } else {
    req.user = user;
    next();
  }
}

function validateUser(req, res, next) {
  // SİHRİNİZİ GÖRELİM

  const { name } = req.body;
  if (!name || !name.trim()) {
    res.status(400).json({ message: "gerekli name alanı eksik" });
  } else {
    req.name = name.trim();
    next();
  }
}

function validatePost(req, res, next) {
  // SİHRİNİZİ GÖRELİM

  const { text } = req.body;
  if (!text || !text.trim()) {
    res.status(400).json({ message: "gerekli text alanı eksik" });
  } else {
    req.text = text.trim();
    next();
  }
}

// bu işlevleri diğer modüllere değdirmeyi unutmayın

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
