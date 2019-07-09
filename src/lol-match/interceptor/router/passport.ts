import passport from "passport";
import * as passportKaKao from 'passport-kakao';
import keys from '../../config/api-key';
import { Inject,Container, Service } from "typedi";
import User from "../../entity/user/user";
import { InternalServerError } from "../../error/error";

const KaKaoStrategy = passportKaKao.Strategy;
class Passport {
	constructor(@Inject("userService") private userService:UserService<User>){
		this.init();
	}
	
	init() {
		const _userService:UserService<User> = this.userService;

		passport.serializeUser((user:any, done) => { // Strategy 성공 시 호출됨
			delete user.accessToken;

			done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
		});
		
		passport.deserializeUser((user:any, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
			done(null, user); // 여기의 user가 req.user가 됨
		});

		passport.use(new KaKaoStrategy({
			clientID: keys.kakao.clientID,
			clientSecret: keys.kakao.clientSecret,
			callbackURL: "/auth/kakao/callback"
		},async function (accessToken:string, refreshToken:string, profile:any, done:any) {
			const _profile = profile._json;
			

			try{
				const hasUser = await _userService.findByEmail(_profile.kaccount_email);


				const user = new User();
				user.id = _profile.id;
				user.name = _profile.properties.nickname;
				user.email = _profile.kaccount_email;

				if(hasUser === undefined) _userService.save(user)

			}catch(e){
				const err = new InternalServerError("회원가입 중에 에러가 발생하였습니다.");
				return done(err,null);
			}
			
			done(null,{"id":_profile.id,"email":_profile.kaccount_email,"name":_profile.nickname,"accessToken":accessToken,"isAddInfo":false});
		}));
	}

}

export {Passport};
