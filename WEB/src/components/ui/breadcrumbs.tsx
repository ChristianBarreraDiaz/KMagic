"use client";

import { usePathname } from "@/lib/next/navigation";

import Link from "@/lib/next/link";
import { cn } from "@/lib/utils";
import { capitalizeFirstLetter } from "@/utils/capitalizeLetterFormatter";

type Path = {
  name: string;
  url: string;
};

type Props = {
  className?: string;
  basePath?: Path[];
  currentPath?: Path;
};

function Breadcrumbs({ className, basePath, currentPath }: Props) {
  const pathname = usePathname();
  let customBasePath: Path[] | undefined = basePath;
  let customCurrentPath: Path | undefined = currentPath;

  if (
    !(
      customBasePath &&
      customBasePath.length > 0 &&
      customCurrentPath &&
      customCurrentPath
    )
  ) {
    const urlSegmentName: string[] = pathname.split("/");
    let urlFormated = "";
    const basePath: Path[] = [];

    for (let i = 1; i < urlSegmentName.length - 1; i++) {
      const url = urlSegmentName[i];
      if (
        url &&
        !/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i.test(
          url,
        )
      ) {
        urlFormated = url === "" ? url : urlFormated + "/" + url;
        basePath.push({ name: capitalizeFirstLetter(url), url: urlFormated });
      }
    }

    const lastSegment = urlSegmentName[urlSegmentName.length - 1];
    let name = capitalizeFirstLetter(lastSegment);

    if (
      /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i.test(
        lastSegment,
      )
    ) {
      // If the last segment is a UUID, use the segment before it
      const lastNonUuidIndex = urlSegmentName.length - 2;
      if (lastNonUuidIndex >= 0) {
        name = capitalizeFirstLetter(urlSegmentName[lastNonUuidIndex]);
        basePath.pop(); // Remove the last segment before the UUID
      }
    }

    const currentPath: Path = {
      name: name,
      url: pathname,
    };

    customBasePath = basePath;
    customCurrentPath = currentPath;
  }

  return (
    <div className={cn("w-1/2 text-left", className)}>
      <nav aria-label="breadcrumb" className="w-max">
        <ol className="bg-blue-gray-50 flex w-full flex-wrap items-center rounded-md bg-opacity-60 py-2">
          <li className="flex cursor-pointer items-center text-sm leading-normal">
            <Link
              className="text-chetwode-blue-300 hover:text-chetwode-blue-500 opacity-80 transition-colors duration-300 hover:opacity-100"
              href="/"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
            </Link>
            <span className="text-chetwode-blue-500 pointer-events-none mx-2 select-none text-sm leading-normal">
              /
            </span>
          </li>
          {customBasePath.map((path) => (
            <li
              className="flex cursor-pointer items-center text-sm leading-normal"
              key={path.name}
            >
              <Link
                className="text-chetwode-blue-300 hover:text-chetwode-blue-500 opacity-80 transition-colors duration-300 hover:opacity-100"
                href={path.url}
              >
                <span>{path.name}</span>
              </Link>
              <span className="text-chetwode-blue-500 pointer-events-none mx-2 select-none text-sm leading-normal">
                /
              </span>
            </li>
          ))}

          <li className="text-blue-gray-900 hover:text-chetwode-blue-600 flex cursor-pointer  items-center text-sm font-normal leading-normal antialiased transition-colors duration-300">
            <Link
              className="text-blue-gray-900 hover:text-chetwode-blue-600 font-medium transition-colors"
              href={customCurrentPath.url}
            >
              {customCurrentPath.name}
            </Link>
          </li>
        </ol>
      </nav>
    </div>
  );
}

export default Breadcrumbs;
