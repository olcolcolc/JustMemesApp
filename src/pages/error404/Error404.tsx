import error404img from "../../assets/error404img.svg";

export default function Error404() {
  return (
    <div className="error404" data-testid="error404">
      <img
        src={error404img}
        alt="error404"
        style={{ display: "block", margin: "0 auto" }}
      />
    </div>
  );
}
