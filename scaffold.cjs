const fs = require('fs');
const path = require('path');

const dirs = [
  'src/components/layout',
  'src/components/ui',
  'src/components/3d',
  'src/components/map',
  'src/pages',
  'src/utils',
  'src/hooks',
  'src/types',
  'src/assets',
  'src/data'
];

dirs.forEach(dir => {
  fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
});

const files = {
  'src/components/layout/Navbar.tsx': `export default function Navbar() { return <nav>Navbar</nav>; }`,
  'src/components/layout/Footer.tsx': `export default function Footer() { return <footer>Footer</footer>; }`,
  'src/pages/Home.tsx': `export default function Home() { return <div>Home Page</div>; }`,
  'src/pages/Explore.tsx': `export default function Explore() { return <div>Explore Page</div>; }`,
  'src/pages/HistoLence.tsx': `export default function HistoLence() { return <div>HistoLence Page</div>; }`,
  'src/pages/HeritageSite.tsx': `export default function HeritageSite() { return <div>Heritage Site Page</div>; }`,
  'src/pages/Community.tsx': `export default function Community() { return <div>Community Page</div>; }`,
  'src/pages/AdminDashboard.tsx': `export default function AdminDashboard() { return <div>Admin Dashboard Page</div>; }`,
  'src/pages/NotFound.tsx': `export default function NotFound() { return <div>404 Not Found</div>; }`,
};

Object.entries(files).forEach(([filepath, content]) => {
  fs.writeFileSync(path.join(__dirname, filepath), content);
});

console.log('Scaffolding complete.');
