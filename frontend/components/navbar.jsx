import { fontMerriweather } from '@/config/fonts';
import { siteConfig } from '@/config/site';
import {
  Button,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import { link } from '../config/links';
import { text } from '../config/text';
export default function MyNavbar() {
  return (
    <Navbar maxWidth="full" isBordered>
      <NavbarContent justify="start">
        <p className={`${fontMerriweather.className} text-2xl`}>
          {siteConfig.name}
        </p>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link href={link.signIn} className="text-sm">
            {text.signIn}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href={link.signUp} variant="shadow">
            {text.signUp}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
