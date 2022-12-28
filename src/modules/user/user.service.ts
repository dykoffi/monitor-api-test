import db from "../../configs/db";
import { User , Prisma as PTypes } from "@prisma/client";

class UserService {

    constructor() { }

    // Methods for creating User

    async addOne(data: PTypes.UserCreateInput): Promise<User> {
        return db.user.create({ data });
    }

    // Methods for get User information

    async getAll(args: PTypes.UserFindManyArgs): Promise<Array<User>> {
        return db.user.findMany(args);
    }

    async getById(id: number): Promise<User | null> {
        return db.user.findUnique({ where: { id_: id } });
    }

    // Methods for updating User information

    async updateById(id: number, args: PTypes.UserUpdateInput): Promise<User> {
        return db.user.update({ where: { id_: id }, data: args });
    }

    // Methods for deleting User
    
    async deleteById(id: number): Promise<User> {
        return db.user.delete({ where: { id_: id } });
    }

}

export default UserService;