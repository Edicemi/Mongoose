const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const Staff = mongoose.model('staff');

router.get('/', (req, res) => {
    res.render('staffs/edit', {
        viewTitle: 'Insert Staff'
    })
})

router.post('/', (req, res) => {
    if (req.body._id == '') {
        insertRecord(req, res)
    } else {
        updateRecord(req, res)
    }
})

function insertRecord(req, res) {
    const staff = new Staff()
    staff.fullname = req.body.fullname;
    staff.email = req.body.email;
    staff.mobile = req.body.mobile;
    staff.city = req.body.city
    staff.save((err, doc) => {
        if (!err) {
            res.render('staffs/list')
        } else {
            console.log('Error during insert: ' + err);
        }
    })
}

function updateRecord(req, res) {
    Staff.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.render('staffs/list')
        } else {
            console.log('Error during insert: ' + err);
        }
    })
}

router.get('/list', (req, res) => {
    Staff.find((err, doc) => {
        if (!err) {
            res.render('staffs/list', {
                list: doc
            })
        } else {
            console.log('Error in retrieve: ' + err)
        }
    })
})

router.get('/:id', (req, res) => {
    Staff.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('staffs/edit', {
                viewTitle: 'Update Staff',
                staff: doc,
            });
            console.log(doc);
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Staff.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.render('staffs/list')
        } else {
            console.log('Error in deletion: ' + err);
        }
    });
});
module.exports = router;