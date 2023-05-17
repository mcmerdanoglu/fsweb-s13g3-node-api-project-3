const express = require("express");

// `users-model.js` ve `posts-model.js` sayfalarına ihtiyacınız var
const usersModel = require("./users-model");
const postsModel = require("../posts/posts-model");

// ara yazılım fonksiyonları da gereklidir
const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  // TÜM KULLANICILARI İÇEREN DİZİYİ DÖNDÜRÜN
  usersModel
    .get()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

router.get("/:id", validateUserId, (req, res) => {
  // USER NESNESİNİ DÖNDÜRÜN
  // user id yi getirmek için bir ara yazılım gereklidir

  res.json(req.user);
});

router.post("/", validateUser, (req, res, next) => {
  // YENİ OLUŞTURULAN USER NESNESİNİ DÖNDÜRÜN
  // istek gövdesini doğrulamak için ara yazılım gereklidir.

  usersModel
    .insert({ name: req.name })
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch(next);
});

router.put("/:id", validateUserId, validateUser, (req, res, next) => {
  // YENİ GÜNCELLENEN USER NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan ara yazılım gereklidir
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.

  usersModel
    .update(req.params.id, { name: req.name })
    .then(() => {
      return usersModel.getById(req.params.id);
    })
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch(next);
});

router.delete("/:id", validateUserId, (req, res, next) => {
  // SON SİLİNEN USER NESNESİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.

  usersModel
    .remove(req.params.id)
    .then(() => {
      res.json(req.user);
    })
    .catch(next);
});

router.get("/:id/posts", validateUserId, (req, res, next) => {
  // USER POSTLARINI İÇEREN BİR DİZİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.

  usersModel
    .getUserPosts(req.params.id)
    .then((posts) => {
      res.json(posts);
    })
    .catch(next);
});

router.post("/:id/posts", validateUserId, validatePost, (req, res, next) => {
  // YENİ OLUŞTURULAN KULLANICI NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.

  postsModel
    .insert({ user_id: req.params.id, text: req.text })
    .then((newPost) => {
      res.status(201).json(newPost);
    })
    .catch(next);
});

// routerı dışa aktarmayı unutmayın

module.exports = router;
