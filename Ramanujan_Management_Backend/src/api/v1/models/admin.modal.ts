import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../interfaces';

/**
 * Define interface for Admin Model
 *
 * @author Jitul Teron
 */

export interface AdminDocument extends IUser, mongoose.Document {
    isSuperAdmin: Boolean;
    adminType: String;
    createdAt: Date;
    updatedAt: Date;
    access: Array<string>;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const admin = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        tokens: Array,
        isSuperAdmin: Boolean,
        adminType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Department'
        },
        access: Array
    },
    { timestamps: true }
);
/**
 * 0 admin
 * 1 arts
 * 2 science
 * 3 crystal
 * 4 hostel
 */

admin.pre('save', async function (next: mongoose.HookNextFunction) {
    let user = this as AdminDocument;

    if (!user.isModified('password')) return next();

    const hash = await bcrypt.hashSync(user?.password!, 8);

    user.password = hash;
    return next();
});

// admin.methods.comparePassword = async function (candidatePassword: string) {
//     const user = this as AdminDocument;
//     return bcrypt.compare(candidatePassword, user?.password!).catch((e) => false);
// };

export const AdminModel = mongoose.model<AdminDocument>('Admin', admin);
