import Layout from "../components/Layout";
import Heading from "../components/typography/Heading";
import Feedback from "../components/feedback";

export default function Admin() {
    return (
      <>
      <Layout />
      <Heading>Admin</Heading>
      <Feedback type="success" content="You`re logged in!" />
      </>
    );
  }