import { pendingIcon } from "@/app/lib/assets/icons/pages/settings";
import { Account } from "@/interfaces/auth";
import clsx from "clsx";
import Image from "next/image";
import { Tooltip } from "@chakra-ui/react";

export function Status({ user }: { user: Account }) {
  const { isRemoved, isVerified, isApproved } = user;

  if (isApproved === false && !isVerified && !isRemoved) {
    return (
      <div className="inline-flex gap-1 items-center py-2 px-2 bg-opacity-10 rounded-md w-auto text-[#FEA501] bg-[#FEA501]">
        <span>Pending Approval</span>
        <span className="w-4 h-4">
          <Image src={pendingIcon} alt="Pending Indicator" />
        </span>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "inline-flex gap-1 items-center py-2 px-2 bg-opacity-10 rounded-md w-auto",
        isRemoved
          ? "text-red-medium bg-red-light"
          : isVerified
            ? "text-green-medium bg-green-medium"
            : "text-[#FEA501] bg-[#FEA501]",
      )}
    >
      {isRemoved && <span>Removed</span>}

      {isVerified && !isRemoved && <span>Active</span>}

      {!isVerified && !isRemoved && (
        <>
          <span>Pending</span>
          <Tooltip
            label="Awaiting account setup by the invited user."
            bg="white"
            color="black"
            width="220px"
            textAlign="center"
            paddingTop="8px"
            paddingBottom="8px"
            rounded="md"
            fontSize="16px"
            hasArrow
          >
            <Image src={pendingIcon} alt="Pending Indicator" />
          </Tooltip>
        </>
      )}
    </div>
  );
}
