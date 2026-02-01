import prisma from "../../lib/prisma";

const getAllUsers = async (
  page: number,
  limit: number,
  search: string = "",
) => {
  const skip = (page - 1) * limit;

  const where: any = {};

  if (search) {
    where.OR = [
      { first_name: { contains: search, mode: "insensitive" } },
      { last_name: { contains: search, mode: "insensitive" } },
      { status: { contains: search, mode: "insensitive" } },
    ];
  }

  const [users, total] = await Promise.all([
    prisma.users.findMany({
      where,
      skip,
      take: limit,
      select: {
        id: true,
        first_name: true,
        last_name: true,
        balance: true,
        status: true,
        createdAt: true,
        _count: {
          select: { shipments: true },
        },
        shipments: {
          take: 1,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            createdAt: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.users.count({ where }),
  ]);

  const formattedusers = users.map((users) => ({
    ...users,
    shipment_count: users._count.shipments,
    last_shipment: users.shipments[0] || null,
    _count: undefined,
    shipments: undefined,
  }));

  return {
    data: formattedusers,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

const checkUser = async (id: number) => {
  return prisma.users.findUnique({
    where: { id },
    select: {
      id: true,
    },
  });
};

const getUserDetails = async (id: number) => {
  return prisma.users.findUnique({
    where: { id },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      status: true,
      balance: true,
      last_login_at: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: { shipments: true },
      },
    },
  });
};

const updateUserStatus = async (id: number, status: string) => {
  return prisma.users.update({
    where: { id },
    data: { status },
  });
};

const deleteUser = async (id: number) => {
  return prisma.users.delete({
    where: { id },
  });
};

export default {
  getAllUsers,
  checkUser,
  getUserDetails,
  updateUserStatus,
  deleteUser,
};
