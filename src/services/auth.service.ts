import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import { PostgreSqlReturn } from '../interfaces/postgre.interface';
import { User } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import { isEmptyObject } from '../utils/util';
import DbService from '../lib/postgre.db';

class AuthService {
  public users = userModel;

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = this.users.find(user => user.email === userData.email);
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User = { id: (this.users.length + 1), ...userData, password: hashedPassword };

    return createUserData;
  }

  public async login(userData: CreateUserDto): Promise<{ auth: string, findUser: User }> {
    if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");

    //DAO로 빼야하는 부분이지만 일단 임의로 처리함...
    const sqlValue = [userData.email];
    const sql = `
      SELECT 
        user_id AS id,
        user_pw AS pw,
        user_email AS email, 
        user_state AS state
      FROM ssu_forest.meerkat_member 
      WHERE user_email = $1`;
    const db = new DbService();
    const queryData: PostgreSqlReturn = await db.query(sql, sqlValue);
    if(queryData.rowCount <= 0) throw new HttpException(409, "이메일이 잘못되었습니다.");

    //유저 패스워드 비교
    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, queryData.rows[0]['pw']);
    if (!isPasswordMatching) throw new HttpException(409, "패스워드가 틀렸습니다.");

    const findUser: User = {
      id: queryData.rows[0].id, 
      email: queryData.rows[0].email,
      state: queryData.rows[0].state
    };

    const tokenData = this.createToken(findUser);
    const auth = tokenData.token;
    //const cookie = this.createCookie(tokenData);
    return { auth, findUser };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = this.users.find(user => user.password === userData.password);
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id , email: user.email , state: user.state };
    const secret: string = process.env.JWT_SECRET;
    const expiresIn: number = 60 * 60 * 7;

    return { expiresIn, token: jwt.sign(dataStoredInToken, secret, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
