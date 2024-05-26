import CreatePost from "./components/create_new_post";
import PageTitle from "./components/pagetitle";
import Announcements from "./components/announcements";
import Posts from "./components/posts";

export default function FeedPage() {
  return (
    <main className="grid lg:grid-cols-feed justify-center w-full h-full">
      <section className="w-full h-screen scrollbar overflow-y-scroll flex flex-col border-l border-r border-st-gray dark:border-st-grayDark">
        <PageTitle title="Feed" background="primary" />
        <section className="pt-[7vh]">
          <CreatePost />
          <Posts />
        </section>
      </section>
      <section className="hidden lg:flex px-2 h-screen overflow-y-scroll scrollbar pt-[7vh]">
        <Announcements />
      </section>
    </main>
  );
}
