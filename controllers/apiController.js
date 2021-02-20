const Item = require("../models/Item");
const Decor = require("../models/Activity");
const Couple = require("../models/Booking");
const Category = require("../models/Category");
const Bank = require("../models/Bank");
const Booking = require("../models/Booking");
const Member = require("../models/Member");

module.exports = {
  landingPage: async (req, res) => {
    try {
      const mostPicked = await Item.find()
        .select("_id title city village price unit imageId")
        .limit(5)
        .populate({ path: "imageId", select: "_id imageUrl" });
      const category = await Category.find()
        .select("_id name")
        .limit(3)
        .populate({
          path: "itemId",
          select: "_id title city village isPopular unit imageId",
          perDocumentLimit: 4,
          // descending
          options: { sort: { sumBooking: -1 } },
          populate: {
            path: "imageId",
            select: "_id imageUrl",
            perDocumentLimit: 1,
          },
        });
      const couple = await Couple.find();
      const decor = await Decor.find();

      for (let i = 0; i < category.length; i++) {
        for (let x = 0; x < category[i].itemId.length; x++) {
          const item = await Item.findOne({ _id: category[i].itemId[x]._id });
          item.isPopular = false;
          await item.save();
          if (category[i].itemId[0] === category[i].itemId[x]) {
            item.isPopular = true;
            await item.save();
          }
        }
      }

      const testimonial = {
        _id: "asasdasdad0assdgag",
        imageUrl: "images/testimonial.jpg",
        name: "Happy Wedding",
        rate: "4.5",
        content: "Wedding Organizernya memang mantappu jiwa",
        familyName: "Asep",
        familyOccupation: "Web developer",
      };

      res.status(200).json({
        hero: {
          couples: couple.length,
          decors: decor.length,
        },
        mostPicked,
        category,
        testimonial,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },

  detailPage: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findOne({ _id: id })
        .populate({ path: "imageId", select: "_id imageUrl" })
        .populate({ path: "featureId", select: "_id name qty imageUrl" })
        .populate({ path: "activityId", select: "_id name type imageUrl" });

      const bank = await Bank.find();
      const booking = await Booking.find().select(" _id bookingStartDate bookingEndDate");

      // const testimonial = {
      //   _id: "asasdasdad1assdgag",
      //   imageUrl: "images/testimoni2.jpg",
      //   name: "Happy Wedding",
      //   rate: "4.5",
      //   content: "Unforget moments",
      //   familyName: "Rafly",
      //   familyOccupation: "Karyawan swasta",
      // };

      res.status(200).json({ ...item._doc, bank, booking });
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },

  bookingPage: async (req, res) => {
    const {
      idItem,
      duration,
      // price,
      bookingStartDate,
      bookingEndDate,
      firstName,
      lastName,
      email,
      phoneNumber,
      accountHolder,
      bankFrom,
    } = req.body;

    if (!req.file) {
      return res.status(404).json({ message: "Image not found" });
    }

    console.log(idItem);

    if (
      idItem === undefined ||
      duration === undefined ||
      // price === undefined ||
      bookingStartDate === undefined ||
      bookingEndDate === undefined ||
      firstName === undefined ||
      lastName === undefined ||
      email === undefined ||
      phoneNumber === undefined ||
      accountHolder === undefined ||
      bankFrom === undefined
    ) {
      res.status(404).json({ message: "Lengkapi semua field" });
    }

    const item = await Item.findOne({ _id: idItem });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.sumBooking += 1;

    await item.save();

    let total = item.price;
    // let tax = total * 0.1;

    const invoice = Math.floor(1000000 + Math.random() * 9000000);

    const member = await Member.create({
      firstName,
      lastName,
      email,
      phoneNumber,
    });

    const newBooking = {
      invoice,
      bookingStartDate,
      bookingEndDate,
      total: (total),
      itemId: {
        _id: item.id,
        title: item.title,
        price: item.price,
        duration: duration,
      },

      memberId: member.id,
      payments: {
        proofPayment: `images/${req.file.filename}`,
        bankFrom: bankFrom,
        accountHolder: accountHolder,
      },
    };
    // console.log(newBooking);
    const booking = await Booking.create(newBooking);
    // console.log(booking);
    res.status(201).json({ message: "Success Booking", booking });
  },
};
