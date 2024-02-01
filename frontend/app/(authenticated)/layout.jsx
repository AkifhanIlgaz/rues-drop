import MyNavbar from '@/components/navbar';

export default function Layout({ children }) {
  return (
    <div>
      <MyNavbar></MyNavbar>
      {children}
    </div>
  );
}
