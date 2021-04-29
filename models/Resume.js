import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ResumeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  vacancy: {
    type: Schema.Types.ObjectId,
    ref: 'vacancy'
  },
  basics: {
    name: {
      type: String
    },
    label: {
      type: String
    },
    picture: { data: Buffer, contentType: String },
    email: {
      type: String
    },
    phone: {
      type: String
    },
    website: {
      type: String
    },
    summary: {
      type: Schema.Types.ObjectId,
      ref: 'objective'
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
    profiles: [
      {
        network: {
          type: String
        },
        username: {
          type: String
        },
        url: {
          type: String
        }
      }
    ],
    work: [
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
    awards: [
      {
        title: {
          type: String
        },
        date: {
          type: Date
        },
        awarder: {
          type: String
        },
        summary: {
          type: String
        }
      }
    ],
    publications: [
      {
        name: { type: String },
        publisher: { type: String },
        releaseDate: { type: Date },
        website: { type: String },
        summary: { type: String }
      }
    ],
    skills: [
      {
        name: { type: String },
        level: { type: String },
        keywords: {
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
    ]
  }
});

export default mongoose.models.ResumeSchema ||
  mongoose.model('resume', ResumeSchema);
