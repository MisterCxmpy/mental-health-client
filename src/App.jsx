import { Route, Routes, Navigate } from 'react-router-dom';
import { Navbar } from './layouts';
import { Home, Activities, Login, Signup, Intro, Discussions, Game, ErrorPage, AIMentor, MindStore, DiscussionForum } from './pages';
import ProtectRoute from './components/ProtectRoute';

function App() {
  return (
    <Routes>
      <Route path="/authenticate/login" element={<Login />} />
      <Route path="/authenticate/signup" element={<Signup />} />
      <Route path="/authenticate/intro" element={<Intro />} />
      <Route element={<ProtectRoute />}>
        <Route path="/" element={<Navbar />}>
          <Route path="/my-ai-mentor" element={<AIMentor />} />
          <Route index element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/:id" element={<Game />} />
          <Route path="/discussions" element={<Discussions />} />
          <Route path="/discussions/:id" element={<DiscussionForum />} />
          <Route path="/mindstore" element={<MindStore />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
