import express from "express";

const app = express();
app.use(express.json());

app.post("/API_Creation", (req, res) => {
  const { str1, str2 } = req.body;

  if (!str1 || !str2) {
    return res.status(400).json({ message: "Send str1 and str2" });
  }

  const result = longestCommonPalindromicSubsequence(str1, str2);
  res.json({ result });
});

function longestCommonPalindromicSubsequence(a, b) {
  let ans = 0;
  for (let i = 0; i < a.length; i++) {
    for (let j = i; j < a.length; j++) {
      const sub = a.substring(i, j + 1);
      const rev = sub.split("").reverse().join("");
      if (sub !== rev) continue;

      let p = 0;
      for (let ch of b) if (p < sub.length && sub[p] === ch) p++;

      if (p === sub.length) ans = Math.max(ans, sub.length);
    }
  }
  return ans;
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
