import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";

//Custom link that take styles from Link of radixUI and Navigation from next/Link so you navigate and have proper styling
interface Props {
  href: string;
  children: string;
}
const Link = ({ href, children }: Props) => {
  return (
    /*passHref This is needed in order to pass the href to the child <a> tag.*/
    <NextLink href={href} legacyBehavior passHref>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
};

export default Link;
