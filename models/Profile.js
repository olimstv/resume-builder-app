import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  location: {
    address: {
      type: String
    },
    postalCode: {
      type: String
    },
    city: {
      type: String
    },
    countryCode: {
      type: String
    },
    region: {
      type: String
    }
  },
  relocation: {
    type: Boolean
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  website: {
    type: String
  },
  contacts: [
    {
      phone: {
        type: String
      },
      email: {
        type: String,
        required: true
      }
    }
  ],
  experience: [
    {
      company: {
        type: String
      },
      position: {
        type: String
      },
      website: {
        type: String
      },
      startDate: {
        type: Date
      },
      endDate: {
        type: Date
      },
      summary: {
        type: String
      },
      highlights: {
        type: [String]
      }
    }
  ],
  volunteer: [
    {
      organization: {
        type: String
      },
      position: {
        type: String
      },
      website: {
        type: String
      },
      startDate: {
        type: Date
      },
      endDate: {
        type: Date
      },
      summary: {
        type: String
      },
      highlights: {
        type: [String]
      }
    }
  ],
  education: [
    {
      institution: {
        type: String
      },
      area: {
        type: String
      },
      studyType: {
        type: String
      },
      startDate: {
        type: Date
      },
      endDate: {
        type: Date
      },
      gpa: {
        type: String
      },
      courses: {
        type: [String]
      }
    }
  ],
  languages: [
    {
      language: { type: String },
      fluency: { type: String }
    }
  ],
  interests: [
    {
      name: { type: String },
      keywords: {
        type: [String]
      }
    }
  ],
  references: [
    {
      name: { type: String },
      reference: { type: String }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.ProfileSchema ||
  mongoose.model('profile', ProfileSchema);
