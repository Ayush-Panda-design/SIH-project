import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

export function initializePassport() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback',
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          if (!email) {
            return done(new Error('No email found in Google profile'), null);
          }

          // Try to find user by googleId first, then by email
          let user = await User.findOne({
            $or: [{ googleId: profile.id }, { email }],
          });

          if (user) {
            // Link Google account if user exists by email but not yet linked
            if (!user.googleId) {
              user.googleId = profile.id;
              if (!user.avatarUrl && profile.photos?.[0]?.value) {
                user.avatarUrl = profile.photos[0].value;
              }
              await user.save();
            }
          } else {
            // Create new user
            user = await User.create({
              name: profile.displayName,
              email,
              googleId: profile.id,
              avatarUrl: profile.photos?.[0]?.value || null,
            });
          }

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
}
