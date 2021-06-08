import dbConnect from '../../../util/dbConnect';
import Resume from '../../../models/Resume';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    // @route   GET api/resumes
    // @desc    Get all profile resumes
    // @access  Private
    case 'GET':
      try {
        const resumes = await Resume.find({});

        res.status(200).json({ success: true, data: resumes });
      } catch (err) {
        console.error(err.message);
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const resume = await Resume.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: resume });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    // case 'POST':
    //   // @route   POST api/resumes
    //   // @desc    Create/update resume
    //   // @access  Private
    //   const { user, vacancy, slug, title, subprofile } = req.body;
    //   const resumeFields = {};
    //   resumeFields.user = req.user.id;
    //   if (vacancy) resumeFields.vacancy = vacancy;
    //   if (slug) resumeFields.slug = slug;
    //   if (title) resumeFields.title = title;
    //   if (subprofile) resumeFields.subprofile = subprofile;

    //   try {
    //     let resume = await Resume.findOne({ user: req.user.id });
    //     if (resume) {
    //       // Update
    //       resume = await Resume.findOneAndUpdate({
    //         user: req.user.id,
    //         $set: resumeFields,
    //         new: true
    //       });
    //     }
    //     // Create
    //     resume = new Resume(resumeFields);
    //     res.status(201).json({ success: true, data: resume });
    //   } catch (err) {
    //     console.log(err.message);
    //     res.status(400).json({ success: false });
    //   }
    //   break;
    case 'DELETE':
      // @route   DELETE api/resumes/:id
      // @desc    Delete resume
      // @access  Private
      try {
        await Resume.findByIdAndDelete(req._id);
        res.json({ msg: 'Resume deleted' });
      } catch (err) {
        console.log(err.message);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
