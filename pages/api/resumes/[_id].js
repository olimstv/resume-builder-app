import dbConnect from '../../../util/dbConnect';
import Resume from '../../../models/Resume';

export default async function handler(req, res) {
  const {
    query: { id },
    method
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const resume = await Resume.findById(id);
        if (!resume) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: resume });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT' /* Edit a model by its ID */:
      try {
        const resume = await Resume.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        if (!resume) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: resume });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedResume = await Resume.deleteOne({ _id: id });
        if (!deletedResume) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
