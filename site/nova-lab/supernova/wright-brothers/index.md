---
supernova: wright-brothers
layout: nova-req
hiddenNotes:
    - Changed "Venturer" to "Venturer / Sea Scout" or "Venturer or Sea Scout" in most requirements
    - Changed "Boy Scout" to "Scouts BSA member"
data:
    requirements: requirements.yaml
---

{{#figure-container}}
<img src="{{supernova}}-award.jpg" class="W(100%) Mx(a) H(a)">
{{^}}

**{{>supernova-name}} Supernova Award**<br />*For Venturers and Sea Scouts*

You must be a Venturer or Sea Scout to earn a Venturing or Sea Scout Supernova award. With your parent’s and unit leader’s help, you must select a council-approved mentor who is a registered Scouter. You may NOT choose your parent or your unit leader (unless the mentor is working with more than one youth).

**A Note to the Mentor**

The Venturing and Sea Scout Supernova awards recognize superior achievement by a Venturer or Sea Scout in the fields of science, technology, engineering, and mathematics (STEM). All experiments or projects should be conducted using the highest level of safety protocol and always under the supervision of a qualified, responsible adult.

{{/figure-container}}

# Requirements

{{>show-requirements requirements=data.requirements}}
