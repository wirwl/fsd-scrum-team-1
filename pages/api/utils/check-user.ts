import { NextApiRequest, NextApiResponse } from 'next';

import { IUser } from 'src/services/dto/User';
import FirebaseAdmin from 'src/services/FirebaseAdmin';

const firebaseAdmin = new FirebaseAdmin();

const validate = async (token: string): Promise<{ user: IUser | null }> => {
  try {
    const decodedToken = await firebaseAdmin.auth.verifyIdToken(token, true);

    const firebaseUser = await firebaseAdmin.auth.getUser(decodedToken.uid);

    const { uid } = firebaseUser;

    const user = await firebaseAdmin.getUser(uid);

    return {
      user,
    };
  } catch (error) {
    console.error(error);
    return { user: null };
  }
};

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { token } = JSON.parse(req.headers.authorization || '{}') as { token: string | undefined };

  if (token === undefined) {
    return res.status(403).send({
      errorCode: 403,
      message: 'Auth token missing.',
    });
  }

  const result = await validate(token);

  return res.status(200).send(result);
};
