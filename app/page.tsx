import BohrsModel from "@/components/scene";

export default function Home() {
  return (
    <>
      <div
        style={{
          display: "fixed",
          position: "absolute",
          top: "1rem",
          left: "2rem",
        }}
      >
        <h1
          style={{
            color: "white",
            paddingBottom: "0.2rem",
          }}
        >
          Nathan Potter
        </h1>
        <p style={{ color: "#acacac" }}>Bohr's Model Force Diagram</p>
        <p style={{ color: "#7a7a7a", paddingTop: "0.1rem" }}>
          https://github.com/nathanpotter17
        </p>
      </div>
      <BohrsModel />
    </>
  );
}
