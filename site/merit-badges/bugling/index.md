---
badge: bugling
layout: smb-merit-badge
requirements: true
data:
    requirements: ./requirements.yaml
calls:
    - audio: first-call.mp3
      label: First Call
      score: first-call.png
    - audio: reveille.mp3
      label: Reveille
      score: reveille.png
    - audio: assembly.mp3
      label: Assembly
      score: assembly.png
    - audio: mess.mp3
      label: Mess
      score: mess.png
    - audio: drill-call.mp3
      label: Drill Call
      score: drill-call.png
    - audio: fatigue.mp3
      label: Fatigue
      score: fatigue.png
    - audio: officers-call.mp3
      label: Officer's Call
      score: officers-call.png
    - audio: recall.mp3
      label: Recall
      score: recall.png
    - audio: church-call.mp3
      label: Church Call
      score: church-call.png
    - audio: swimming-call.mp3
      label: Swimming Call
      score: swimming-call.png
    - audio: fire-call.mp3
      label: Fire Call
      score: fire-call.png
    - audio: retreat-evening-colors.mp3
      label: Retreat (Evening Colors)
      score: retreat-evening-colors.png
    - audio: to-the-colors.mp3
      label: To The Colors
      score: to-the-colors.png
    - audio: call-to-quarters.mp3
      label: Call To Quarters
      score: call-to-quarters.png
    - audio: taps.mp3
      label: Taps
      score: taps.png
---

## Resources

{{#figure}}<img src="bugling-bucky.jpg" class="W(100%)" />{{/figure}}
{{>resources}}

### Calls

{{#calls}}
<img src="{{score}}" class="W(50%)" />
<div class="D(f) Jc(c)"><a href="{{audio}}">Listen to {{label}}</a></div>
{{/calls}}
