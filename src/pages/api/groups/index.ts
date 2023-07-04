import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { groupValidationSchema } from 'validationSchema/groups';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getGroups();
    case 'POST':
      return createGroup();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getGroups() {
    const data = await prisma.group
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'group'));
    return res.status(200).json(data);
  }

  async function createGroup() {
    await groupValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.membership?.length > 0) {
      const create_membership = body.membership;
      body.membership = {
        create: create_membership,
      };
    } else {
      delete body.membership;
    }
    if (body?.payment?.length > 0) {
      const create_payment = body.payment;
      body.payment = {
        create: create_payment,
      };
    } else {
      delete body.payment;
    }
    const data = await prisma.group.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
