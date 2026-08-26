import { Schema } from "mongoose";

const CompanyWorkLocationGeoPointSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["Point"],
      default: "Point",
    },

    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: (value: unknown): boolean => {
          if (!Array.isArray(value) || value.length !== 2) {
            return false;
          }

          const [longitude, latitude] = value;

          return (
            typeof longitude === "number" &&
            typeof latitude === "number" &&
            Number.isFinite(longitude) &&
            Number.isFinite(latitude) &&
            longitude >= -180 &&
            longitude <= 180 &&
            latitude >= -90 &&
            latitude <= 90
          );
        },

        message:
          "Coordinates must be [longitude, latitude] with valid geographic ranges.",
      },
    },
  },
  {
    _id: false,
    strict: true,
  },
);

const CompanyWorkLocationAddressSchema = new Schema(
  {
    street: {
      type: String,
      trim: true,
      maxlength: 255,
    },

    city: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    state: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    country: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    postalCode: {
      type: String,
      trim: true,
      maxlength: 20,
    },
  },
  {
    _id: false,
    strict: true,
  },
);

const CompanyWorkLocationGeoFenceSchema = new Schema(
  {
    location: {
      type: CompanyWorkLocationGeoPointSchema,
      required: true,
    },

    radiusMeters: {
      type: Number,
      required: true,
      min: 50,
      max: 100000,
    },

    enabled: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    _id: false,
    strict: true,
  },
);

const CompanyWorkLocationMetaSchema = new Schema(
  {
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },

    deletedAt: {
      type: Date,
    },
  },
  {
    _id: false,
    strict: true,
  },
);

export const CompanyWorkLocationSchema = new Schema(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 150,
    },

    code: {
      type: String,
      trim: true,
      uppercase: true,
      maxlength: 50,
    },

    address: {
      type: CompanyWorkLocationAddressSchema,
    },

    geoFence: {
      type: CompanyWorkLocationGeoFenceSchema,
      required: true,
    },

    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },

    isPrimary: {
      type: Boolean,
      required: true,
      default: false,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    meta: {
      type: CompanyWorkLocationMetaSchema,
      required: true,
      default: {},
    },
  },
  {
    timestamps: true,
    strict: true,
    versionKey: false,
  },
);

CompanyWorkLocationSchema.index({
  "geoFence.location": "2dsphere",
});

CompanyWorkLocationSchema.index(
  {
    companyId: 1,
    code: 1,
  },
  {
    unique: true,
    name: "uq_active_work_location_code",
    partialFilterExpression: {
      code: {
        $exists: true,
        $type: "string",
      },
      "meta.isDeleted": false,
    },
  },
);

CompanyWorkLocationSchema.index(
  {
    companyId: 1,
    isActive: 1,
  },
  {
    name: "idx_work_location_company_active",
  },
);

CompanyWorkLocationSchema.index(
  {
    companyId: 1,
  },
  {
    unique: true,
    name: "uq_active_primary_work_location",
    partialFilterExpression: {
      isPrimary: true,
      "meta.isDeleted": false,
    },
  },
);
