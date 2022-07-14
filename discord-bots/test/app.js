const {
	Client,
	Modal,
	Intents,
	MessageActionRow,
	TextInputComponent,
	MessageEmbed,
	MessageButton,
	MessageSelectMenu,
} = require("discord.js");
const {
	token,
	prefix,
	commandEnabledChannels,
	ticketResChannelId,
} = require("./config.json");

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once("ready", (c) => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on("interactionCreate", (interaction) => {
	console.log(
		`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
	);
});

/*
  *   when someone "interacts" with components (buttons, menu, modal etc)
  *   this event will trigger;

  *   "customId" is what gives the control to developer and help in identifying the specific component.
  TODO  multi-value menu
*/
client.on("interactionCreate", async (interaction) => {
	try {
		if (interaction.customId === "hacker") return;
		let id, subId;
		if (interaction.customId.includes("|")) {
			id = interaction.customId.split("|").shift();
			subId = interaction.customId.split("|").pop();
		} else {
			id = interaction.customId;
		}
		//! BUTTON HANDLING, sending response (and drop-down menu)
		if (interaction.isButton()) {
			switch (id) {
				case "ticket":
					if (subId === "request") {
						const row = new MessageActionRow().addComponents(
							new MessageSelectMenu()
								.setCustomId("request")
								.setPlaceholder("select your request type!")
								.addOptions([
									{
										label: "Web Development",
										description:
											"Dynamic, Robust web applications and 100% proficiency.",
										value: "web",
									},
									{
										label: "Bot Development",
										description:
											"fully customizable discord bots at your service!",
										value: "bot",
									},
								])
						);
						await interaction.reply({ components: [row] });
					} else {
						interaction.reply("coming soon!");
					}
					break;
				default:
					interaction.update({
						content: "case closed! unknown interaction.",
						embeds: [],
						components: [],
					});
			}
		}
		//! DROP DOWN MENU HANDING, sending modal based on value of selected item from drop-down menu
		else if (interaction.isSelectMenu()) {
			switch (id) {
				case "request":
					const value = interaction.values.pop();
					if (value === "bot") {
						const modal = createModal(
							"botDescModal",
							"Discord Bot Description"
						);
						interaction.showModal(modal);
					} else {
						const modal = createModal("webAppDescModal", "Web App Description");
						await interaction.showModal(modal);
					}
					break;
				default:
					interaction.update({
						content: "case closed! unknown interaction.",
						embeds: [],
						components: [],
					});
			}
		}
		//! MODAL SUBMITTION HANDING, working with user submitted data.
		else if (interaction.isModalSubmit()) {
			let embed;
			const id = interaction.customId;
			const inputs = interaction.components.map((row) => {
				return {
					id: row.components[0].customId,
					value: row.components[0].value,
				};
			});
			console.log(id);
			switch (id) {
				case "botDescModal":
					embed = new MessageEmbed()
						.setTitle("Bot Description")
						.setColor("PURPLE")
						.setTimestamp()
						.setFooter(
							"Discord Bot Development Commissions | rootz491 services"
						)
						.addFields([
							...inputs.map((input) => {
								return {
									name: `**${input.id}**`,
									value: input.value,
								};
							}),
						]);
					await interaction.update({
						components: [],
						content: "Your submission was recieved successfully!",
					});
					await interaction.followUp({ embeds: [embed] });
					break;
				case "webAppDescModal":
					embed = new MessageEmbed()
						.setTitle("Web App Description")
						.setColor("PURPLE")
						.setTimestamp()
						.setFooter("Web Development Commissions | rootz491 services")
						.addFields([
							...inputs.map((input) => {
								return {
									name: `**${input.id}**`,
									value: input.value,
								};
							}),
						]);
					await interaction.update({
						components: [],
						content: "Your submission was recieved successfully!",
					});
					await interaction.followUp({ embeds: [embed] });
					break;
				default:
					interaction.reply("invalid form!\ntry again soon.");
			}
		}
	} catch (error) {
		console.log(error);
	}
});

/*
 *  1.  Send initial response to message with a "button" attached, for interactions ofc!
 *  2.  setup a listener for this button's interaction, identified by "customId"
 *  3.  once interaction is done, respond back to user as a reply.
 *      also once can change initial message too!
 */
client.on("messageCreate", async (message) => {
	try {
		const messagePrefix = message.content.split("")[0];
		if (messagePrefix != prefix) return;
		if (
			!commandEnabledChannels.find(
				(channelId) => channelId === message.channelId
			)
		)
			return;

		const command = message.content
			.split(" ")[0]
			.split("")
			.map((n, i) => {
				if (i !== 0) return n;
			})
			.join("");

		const arg1 = message?.content?.split(" ")[1];

		switch (command) {
			case "msg":
				const row = new MessageActionRow().addComponents(
					new MessageButton()
						.setCustomId(arg1)
						.setLabel("know more")
						.setStyle("PRIMARY")
				);
				const embed = new MessageEmbed()
					.setColor("RANDOM")
					.setTitle(arg1)
					.setURL("https://discord.js.org")
					.setDescription("we dont talk about that here!");
				message.delete();
				// message.react("👍🏻");
				message.channel.send({
					components: [row],
					embeds: [embed],
				});
				break;

			case "ticket":
				const btnsRow = new MessageActionRow()
					.addComponents(
						new MessageButton()
							.setCustomId("ticket|report")
							.setLabel("Report User")
							.setStyle("DANGER")
					)
					.addComponents(
						new MessageButton()
							.setCustomId("ticket|request")
							.setLabel("Request Something")
							.setStyle("PRIMARY")
					)
					.addComponents(
						new MessageButton()
							.setCustomId("ticket|suggest")
							.setLabel("Suggest Something")
							.setStyle("SECONDARY")
					);
				const ticketEmbed = new MessageEmbed()
					.setTitle("TICKET")
					.setColor("RANDOM")
					.setDescription("To make a difference, one must take some actions!")
					.setFooter("rootz491 services")
					.addFields([
						{
							name: "Report User",
							value:
								"Comfort of our users is our first priority\nIf someone misbehaves, please let us know.\nWe'll take appropriate actions.",
						},
						{
							name: "Request Something",
							value:
								"We offer services like web & bot development. \nOpen a ticket if you have something in mind that we can help you with!",
						},
						{
							name: "Suggest Something",
							value:
								"We know you're very creative and clever. You got something for us to improve, shoot!",
						},
					]);
				message.reply({ components: [btnsRow], embeds: [ticketEmbed] });
				break;

			default:
				const reply = await message.reply({
					content: "do not spam here!",
				});
				const delTimer = setTimeout(() => {
					message.delete();
					reply.delete();
					clearTimeout(delTimer);
				}, 3000);
				return;
		}

		const filter = (i) =>
			i.customId === "hacker" && i.user.id === message.author.id;

		const collector = message.createMessageComponentCollector({
			filter,
			time: 15000,
		});

		collector.on("collect", async (i) => {
			const embed = new MessageEmbed()
				.setColor("RANDOM")
				.setTitle("Internet's Dark Art")
				.setURL("https://hackerone.com")
				.setDescription("we dont talk about that here!")
				.addField("Intro", "Good or Bad guys, does the same work!")
				.addField(
					"Cobs",
					"For Good guys, Bug Bounty Hunter, Penetration tester & Triager etc...\nFor Bad guys, Spammers, Exploit Dev, Exploit Seller etc..."
				)
				.addField(
					"How to start?",
					"Google about XSS; open every link that google show for atleast 2-3 pages. You can decide from there!"
				);

			await i.update({
				content: "Here we go!",
				components: [],
				embeds: [embed],
			});
		});

		collector.on("end", (collected) => {
			console.log(`Collected ${collected.size} items`);
		});
	} catch (error) {
		console.log(error);
	}
});

function sendEmbedToChannel(embed, client) {
	// ticketResChannelId;
}

function createModal(id, title) {
	const modal = new Modal().setCustomId(id).setTitle(title);
	const name = new TextInputComponent()
		.setCustomId("projectName")
		.setLabel("Project Name")
		.setStyle("SHORT")
		.setMaxLength(15)
		.setMinLength(5)
		.setRequired(true);
	const budget = new TextInputComponent()
		.setCustomId("projectBudget")
		.setLabel("Project Budget")
		.setStyle("SHORT")
		.setMaxLength(5)
		.setMinLength(1)
		.setRequired(true);
	const description = new TextInputComponent()
		.setCustomId("projectDescription")
		.setLabel("Project Description")
		.setStyle("PARAGRAPH")
		.setMinLength(15)
		.setRequired(true);
	modal.addComponents(new MessageActionRow().addComponents(name));
	modal.addComponents(new MessageActionRow().addComponents(budget));
	modal.addComponents(new MessageActionRow().addComponents(description));
	return modal;
}

client.login(token);
