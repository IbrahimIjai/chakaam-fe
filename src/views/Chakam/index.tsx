import { CreateChakam } from "@/components/create-chakam";
import { Chakam } from "../../../generated/prisma";
import { Icons } from "@/components/icons";
import Image from "next/image";
import { ViewChakam } from "./view-chakam";

interface Props {
  chakam: Chakam[] | undefined;
}

const HOST = "https://gateway.lighthouse.storage/ipfs/";

export default function ChakamView({ chakam }: Props) {
  if (chakam && chakam.length === 0) {
    return (
      <div className="w-full h-[calc(100vh-80px)] flex items-center justify-center">
        <CreateChakam>
          <div className="border-dashed w-4/5 lg:w-[500px] border-2 rounded-md flex items-center justify-center p-4 h-48">
            <div className="flex flex-col items-center justify-center">
              <Icons.upload className="h-6 w-6" />
              <p className="text-muted-foreground text-sm">Upload Screenshot</p>
            </div>
          </div>
        </CreateChakam>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Gallery</h2>
        <p className="text-sm text-muted-foreground">Today</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <CreateChakam>
          <div className="border-dashed border-2 rounded-md flex items-center justify-center p-4 h-48">
            <div className="flex flex-col items-center justify-center">
              <Icons.upload className="h-6 w-6" />
              <p className="text-muted-foreground text-sm">Upload Screenshot</p>
            </div>
          </div>
        </CreateChakam>

        {chakam!.map((chakam) => (
          <ViewChakam chakam={chakam}>
            <div
              key={chakam.id}
              className="border rounded-md p-3 h-48 relative w-full"
            >
              <Image
                src={HOST + chakam.image}
                alt={chakam.description}
                className="object-contain"
                fill
              />
            </div>
          </ViewChakam>
        ))}
      </div>
    </div>
  );
}
