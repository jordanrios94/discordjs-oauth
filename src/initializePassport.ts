import { DISCORD_CLIENT_ID, DISCORD_SECRET_KEY, SERVER_URL } from '@config';
import passport from 'passport';
import PassportDiscord from 'passport-discord';
import express from 'express';
class InitializePassport {
  constructor(app: express.Application) {
    app.use(passport.initialize());

    const DiscordStrategy = PassportDiscord.Strategy;

    const scopes = ['identify', 'email', 'guilds', 'guilds.join'];

    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      done(null, id);
    });
    passport.use(
      new DiscordStrategy(
        {
          clientID: DISCORD_CLIENT_ID,
          clientSecret: DISCORD_SECRET_KEY,
          callbackURL: SERVER_URL + '/auth/discord/callback',
          scope: scopes,
        },
        function (accessToken, refreshToken, profile, callBack) {
          return callBack(null, profile);
        },
      ),
    );
  }
}
export default InitializePassport;
