import mongoose from 'mongoose';


const ResumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  slug: {
    type: String
  },
  title: {
    type: String
  },
  subprofile: {
    basics: {
      name: {
        type: String
      },
      label: {
        type: String
      },
      picture: {data: Buffer, contentType: String},
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
          _id: false,
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
      ]
    },
    work: [
      {
        _id: false,
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
        _id: false,
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
        _id: false,
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
        _id: false,
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
        _id: false,
        name: {type: String},
        publisher: {type: String},
        releaseDate: {type: Date},
        website: {type: String},
        summary: {type: String}
      }
    ],
    skills: [
      {
        _id: false,
        name: {type: String},
        level: {type: String},
        keywords: {
          type: [String]
        }
      }
    ],
    languages: [
      {
        _id: false,
        language: {type: String},
        fluency: {type: String}
      }
    ],
    interests: [
      {
        _id: false,
        name: {type: String},
        keywords: {
          type: [String]
        }
      }
    ],
    references: [
      {
        _id: false,
        name: {type: String},
        reference: {type: String}
      }
    ]
  }
});

export default mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);
