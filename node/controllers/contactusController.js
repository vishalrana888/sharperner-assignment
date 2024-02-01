// controllers/contactusController.js
exports.getContactUs = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'contactus.html'));
};

exports.postContactUs = (req, res, next) => {
    // Process the form data here (save to database, send email, etc.)

    // Redirect to '/success' with a success message
    res.redirect('/success');
};
