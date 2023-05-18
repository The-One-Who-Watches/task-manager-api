const express = require("express");
const Review = require("../models/review");
const router = new express.Router();
const auth = require("../middleware/auth");

module.exports = router;

router.post("/reviews", auth, async (req, res) => {
  // const task = new Task(req.body);
  const review = new Review({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await review.save();
    res.status(201).send(review);
  } catch (e) {
    res.status(500).send(e);
  }
});

// GET /reviews?completed={{false/true}}
// Get /reviews?limit=10&skip=20
// GET /reviews?sortBy=createdAt:desc
// router.get("/reviews", auth, async (req, res) => {
//   const match = {};
//   const sort = {};

//   if (req.query.completed) {
//     match.completed = req.query.completed === "true";
//   }

//   if (req.query.sortBy) {
//     const parts = req.query.sortBy.split("_");
//     sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
//   }

//   try {
//     await req.user.populate({
//       path: "reviews",
//       match,
//       options: {
//         limit: parseInt(req.query.limit),
//         skip: parseInt(req.query.skip),
//         sort,
//       },
//     });
//     res.send(req.user.reviews);
//   } catch (e) {
//     res.status(500).send();
//   }
// });

router.get("/reviews", async (req, res) => {
  Review.find({})
    .then((reviews) => {
      res.send(reviews);
    })
    .catch((e) => {});
});

router.get("/reviews/title", (req, res) => {
  const title = req.body.title;

  Review.find({ title })
    .then((reviews) => {
      res.send(reviews);
    })
    .catch((e) => {});
});

router.get("/reviews/type", (req, res) => {
  const mediaType = req.body.mediaType;

  Review.find({ mediaType })
    .then((reviews) => {
      res.send(reviews);
    })
    .catch((e) => {});
});

router.get("/reviews/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    // const task = await Task.findById(_id);
    const review = await Review.findOne({ _id, owner: req.user._id });
    if (!review) {
      return res.status(404).send();
    }

    res.send(review);
  } catch (e) {
    res.status(500).send(e);
  }

  // Task.findById(_id)
  //   .then((task) => {
  //     if (!task) {
  //       return res.status(404).send();
  //     }

  //     res.send(task);
  //   })
  //   .catch((e) => {
  //     res.status(500).send();
  //   });
});

router.patch("/reviews/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const review = await Review.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    // const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => (task[update] = req.body[update]));

    await task.save();

    res.send(task);
  } catch (e) {
    res.status(400).send;
  }
});

router.delete("/reviews/:id", auth, async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!review) {
      return res.status(404).send();
    }

    res.send(review);
  } catch (e) {
    res.status(500).send;
  }
});
