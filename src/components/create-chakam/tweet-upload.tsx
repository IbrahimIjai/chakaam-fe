import { SearchInput } from "../ui/input";

type Props = {
  setTweetUrl: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

export default function TweetUpload({ setTweetUrl, disabled }: Props) {
  return (
    <SearchInput
      type="url"
      placeholder="Paste link here"
      onChange={setTweetUrl}
      disabled={disabled}
    />
  );
}
