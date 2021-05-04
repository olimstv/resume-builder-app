const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide your first name']
  },
  lastName: {
    type: String,
    required: [true, 'Please provide your last name']
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password cannot be less than 6 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide your valid email'],
    unique: [true, 'User with this email address is already exists']
  },
  profile: {
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
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
