import passport from "passport";
import * as passportKaKao from 'passport-kakao';

const KaKaoStrategy = passportKaKao.Strategy;

passport.use(new KaKaoStrategy({
    clientID: "1ca1aedcce66ffa043ae2c5c2a3f42e5",
    clientSecret: "FUGOqSox9foRPKmYZCSJKe5hD6nblQtu",
    callbackURL: "/auth/kakao/callback"
  },
  function (accessToken:string, refreshToken:string, profile:any, done:any) {
    const _profile = profile._json;

    console.log(_profile);
    done(null,{"user_id":_profile.id,"email":_profile.email});
    // loginByThirdparty({
    //   'auth_type': 'kakao',
    //   'auth_id': _profile.id,
    //   'auth_name': _profile.properties.nickname,
    //   'auth_email': _profile.id
    // }, done);
  }
));
