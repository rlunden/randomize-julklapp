const receivers = process.argv.slice(2);

if (!receivers || !Array.isArray(receivers) || receivers.length < 3) {
  console.error(
    'Usage: npm run start <space separated list of at least 3 names>'
  );

  process.exit(1);
}

const givers = [...receivers];

// Randomize a giver to each receiver
const pairs = givers.map((giver, i) => {
  let receiver = giver,
    randomIndex;

  while (
    // Receiver cannot be the same person as the giver
    receiver === giver ||
    // Make sure we don't end up in an infinite loop
    // where the last person is both the giver and receiver
    (receivers.length === 2 &&
      receivers.find((r) => r !== receiver) === givers[i + 1])
  ) {
    randomIndex = Math.floor(Math.random() * receivers.length);
    receiver = receivers[randomIndex];
  }

  receivers.splice(randomIndex as number, 1);
  return { giver, receiver };
});

console.log(pairs.map((pair) => `${pair.giver} → ${pair.receiver}`).join('\n'));
