const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const staff = mongoose.model('staff');

router.get('/', (req, res) => {
    res.render('staff/edit', {
        viewTitle: 'Insert staff'
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
    var staff = new Staff()
    staff.fullname = req.body.fullname;
    staff.email = req.body.email;
    staff.phonenumber = req.body.phonenumber;
    staff.city = req.body.city
    staff.save((err, doc) => {
        if (!err) {
            res.redirect('staff/list')
        } else {
            console.log('Error during insert: ' + err);
        }
    })
}

function updateRecord(req, res) {
    staff.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('staff/list')
        } else {
            console.log('Error during insert: ' + err);
        }
    })
}

router.get('/list', (req, res) => {
    staff.find((err, doc) => {
        if (!err) {
            res.redirect('staff/list', {
                list: doc
            })
        } else {
            console.log('Error in retrieve: ' + err)
        }
    })
})

router.get('/:id', (req, res) => {
    staff.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('staff/edit', {
                viewTitle: 'Update Staff',
                staff: doc,
            });
            console.log(doc);
        }
    });
});

router.get('/delete/:id', (req, res) => {
    staff.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('staff/list')
        } else {
            console.log('Error in deletion: ' + err);
        }
    });
});
module.exports = router;