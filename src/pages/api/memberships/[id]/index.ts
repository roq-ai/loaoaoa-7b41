import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { membershipValidationSchema } from 'validationSchema/memberships';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.membership
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getMembershipById();
    case 'PUT':
      return updateMembershipById();
    case 'DELETE':
      return deleteMembershipById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMembershipById() {
    const data = await prisma.membership.findFirst(convertQueryToPrismaUtil(req.query, 'membership'));
    return res.status(200).json(data);
  }

  async function updateMembershipById() {
    await membershipValidationSchema.validate(req.body);
    const data = await prisma.membership.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteMembershipById() {
    const data = await prisma.membership.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
